<template>
  <div class=" mx-auto p-6  rounded-lg">

    <div class="bg-gray-50 p-6 rounded-lg mb-8">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Add New Team Member</h3>
      <form @submit.prevent="addMember" class="flex items-center space-x-4">
        <div class="flex-grow">
          <label for="name" class="sr-only">Name</label>
          <input type="text" id="name" v-model="newMember.name" required placeholder="Name"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div class="flex-grow">
          <label for="email" class="sr-only">Email</label>
          <input type="email" id="email" v-model="newMember.email" required placeholder="Email"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div class="flex-grow">
          <label for="role" class="sr-only">Role</label>
          <select id="role" v-model="newMember.role" required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="" disabled selected>Select Role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div>
          <button type="submit"
            class="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add Member
          </button>
        </div>
      </form>
    </div>

    <!-- Team Members Table -->
    <div class=" overflow-x-auto overflow-x-auto  sm:rounded-lg">

      <table class="min-w-full divide-y divide-gray-200 sm:rounded-lg">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="member in teamMembers" :key="member.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ member.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ member.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
        member.role === 'Admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800']">
                {{ member.role }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="removeMember(member.id)" class="text-red-600 hover:text-red-900">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add New Member Form -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      teamMembers: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      ],
      newMember: {
        name: '',
        email: '',
        role: 'User'
      }
    };
  },
  methods: {
    addMember() {
      const id = this.teamMembers.length + 1;
      this.teamMembers.push({ id, ...this.newMember });
      this.newMember = { name: '', email: '', role: 'User' };
      // In a real application, you'd send this data to your backend here
    },
    removeMember(id) {
      this.teamMembers = this.teamMembers.filter(member => member.id !== id);
      // In a real application, you'd send a request to your backend to remove the member
    }
  }
};
</script>