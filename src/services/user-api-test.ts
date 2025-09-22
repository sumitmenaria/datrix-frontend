// Test script for the new Datrix API
import { userApiService } from './user-api';

export const testDatrixAPI = async () => {
  console.log('🧪 Testing Datrix API...');
  
  const testOrgId = 'a7626014-c092-47b2-84a7-b8c8c3059526'; // cloudmates org ID
  
  try {
    // Test 1: Fetch Users
    console.log('1. Testing fetchUsers...');
    const users = await userApiService.fetchUsers(testOrgId);
    console.log(`✅ Found ${users.length} users`);
    console.log('Sample user:', users[0]);
    
    // Test 2: Create User (commented out to avoid creating test users)
    /*
    console.log('2. Testing createUser...');
    const createResult = await userApiService.createUser({
      email: 'test@example.com',
      organizationId: testOrgId,
      organizationName: 'cloudmates',
      firstName: 'Test',
      lastName: 'User',
      role: 'User'
    });
    console.log('✅ Create user result:', createResult);
    */
    
    // Test 3: Update User (using existing user)
    if (users.length > 0) {
      console.log('3. Testing updateUser...');
      const testUser = users.find(u => u.email.includes('test'));
      if (testUser) {
        const updateResult = await userApiService.updateUser(testUser.email, {
          firstName: testUser.firstName,
          lastName: testUser.lastName,
          role: testUser.role,
          organizationId: testUser.organizationId
        });
        console.log('✅ Update user result:', updateResult);
      }
    }
    
    console.log('🎉 All tests passed!');
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
};

// Usage: Call this function from browser console or component
// testDatrixAPI();