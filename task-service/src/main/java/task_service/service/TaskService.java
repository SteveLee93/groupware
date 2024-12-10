package task_service.service;

import task_service.model.Task;
import task_service.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
	private final TaskRepository taskRepository;

	public TaskService(TaskRepository taskRepository) {
		this.taskRepository = taskRepository;
	}

	public List<Task> getTasksByUserId(Long userId) {
		return taskRepository.findByUserId(userId);
	}

	public Task createTask(Task task) {
		return taskRepository.save(task);
	}

	public Task getTaskById(Long id) {
		return taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
	}
}
