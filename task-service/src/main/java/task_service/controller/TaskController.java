package task_service.controller;

import task_service.model.Task;
import task_service.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
	private final TaskService taskService;

	public TaskController(TaskService taskService) {
		this.taskService = taskService;
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Task>> getTasksByUserId(@PathVariable Long userId) {
		return ResponseEntity.ok(taskService.getTasksByUserId(userId));
	}

	@PostMapping
	public ResponseEntity<Task> createTask(@RequestBody Task task) {
		return ResponseEntity.ok(taskService.createTask(task));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
		return ResponseEntity.ok(taskService.getTaskById(id));
	}
}
