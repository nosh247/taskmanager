using System.ComponentModel.DataAnnotations;

namespace TaskManager.API.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        public DateTime? DueDate { get; set; }
        
        public TaskStatus Status { get; set; } = TaskStatus.Pending;
        
        [Required]
        [MaxLength(100)]
        public string CreatedBy { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string AssignedTo { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
    }
} 