using System.ComponentModel.DataAnnotations;

public enum UserRole
{
    [Display(Name = "admin")]
    admin = 1,

    [Display(Name = "member")]
    member = 2,

    [Display(Name = "non member")]
    nonmember = 3
}

public class Member
{
    public int id { get; set; }
    public string? username { get; set; }
    public string? email { get; set; }
    public string? password { get; set; }
    public UserRole role { get; set; }
}
