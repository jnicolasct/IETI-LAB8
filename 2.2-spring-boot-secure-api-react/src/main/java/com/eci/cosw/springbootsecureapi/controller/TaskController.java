package com.eci.cosw.springbootsecureapi.controller;

import com.eci.cosw.springbootsecureapi.model.Task;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( "task" )
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    ObjectMapper mapperJson;

    @GetMapping(value = "/list")
    public ResponseEntity<?> getAllTasks() {
        String tasks = null;
        try {
            tasks = Unirest.get("https://ietitaskplanner07.azurewebsites.net/api/list-tasks?code=aXpGFLCaHPLvE5YSJgmaxpNlgvuPL/5YwH5aO/ePCTKAq4eNd/uYYQ==")
                    .asString().getBody();
        } catch (UnirestException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<?> addTask(@RequestBody Task task){
        try {
            Unirest.post("https://ietitaskplanner07.azurewebsites.net/api/add-task?code=52bxhWcjRVsmESiLS8nKSxkcCeZuua3FoHaGYxOV0saGHzQSqg0otw==")
                    .header("Content-Type","application/json")
                    .body(mapperJson.writeValueAsString(task)).asString().getStatus();
        } catch (UnirestException | JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
