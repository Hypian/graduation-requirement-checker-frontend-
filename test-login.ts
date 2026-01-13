
import { authService } from "./src/authService";

// Mock the apiClient dependencies since we are running in node
// and we just want to test the authService logic which is now mocked
// avoiding the need for actual fetch polyfills if we can avoid it.
// However, authService imports from apiClient. 
// Let's just create a test file that simulates the usage.

async function testLogin() {
  console.log("Attempting login with student credentials...");
  try {
      const studentRes = await authService.login({ email: "student@test.com", password: "any" });
      console.log("Student Login Success!");
      console.log("User:", studentRes.user);
      console.log("Token:", studentRes.token);
  } catch (e) {
      console.error("Student Login Failed:", e);
  }

  console.log("\nAttempting login with admin credentials...");
  try {
      const adminRes = await authService.login({ email: "admin@test.com", password: "any" });
      console.log("Admin Login Success!");
      console.log("User:", adminRes.user);
      console.log("Token:", adminRes.token);
  } catch (e) {
       console.error("Admin Login Failed:", e);
  }
}

testLogin();
