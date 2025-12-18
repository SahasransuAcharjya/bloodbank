export function isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }
  
  export function isStrongPassword(password: string): boolean {
    return password.length >= 6;
  }
  
  export function isValidBloodType(bt: string): boolean {
    const allowed = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    return allowed.includes(bt.toUpperCase());
  }
  