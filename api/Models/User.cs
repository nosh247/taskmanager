using System.ComponentModel.DataAnnotations;

namespace TaskManager.API.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string? FirstName { get; set; }
        
        [MaxLength(100)]
        public string? LastName { get; set; }
        
        [MaxLength(500)]
        public string? Picture { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Provider { get; set; } = string.Empty; // "Google", "Microsoft", "Local"
        
        [MaxLength(200)]
        public string? ProviderId { get; set; } // OAuth provider user ID
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? LastLoginAt { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        // Navigation property for tasks created by this user
        public ICollection<TaskItem> CreatedTasks { get; set; } = new List<TaskItem>();
        
        // Navigation property for tasks assigned to this user
        public ICollection<TaskItem> AssignedTasks { get; set; } = new List<TaskItem>();
    }
}
