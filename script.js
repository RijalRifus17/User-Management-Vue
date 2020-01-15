const vue = new Vue({
    el: '#app',
    
    data: {
        querySearch: '',
        appName: 'User Management',
        author: 'Rifus Corp',
        users:  [{
                    "id": 1,
                    "first_name": "Aprilette",
                    "last_name": "Poulglais",
                    "gender": "Female"
                }, 
                {
                    "id": 2,
                    "first_name": "Ashely",
                    "last_name": "Zimmerman",
                    "gender": "Female"
                }, 
                {
                    "id": 3,
                    "first_name": "Babbie",
                    "last_name": "Lortz",
                    "gender": "Female"
                }, 
                {
                    "id": 4,
                    "first_name": "Kristoforo",
                    "last_name": "Hubbis",
                    "gender": "Male"
                }, 
                {
                    "id": 5,
                    "first_name": "Doralynn",
                    "last_name": "Jorge",
                    "gender": "Female"
                }
            ],
        formUser: {
            first_name: '',
            last_name:'',
            gender: 'Male'
        },
        genderOption : [
            'Male', 'Female'
        ],
        editUser: {}
    },

    computed: {
        appTitle() {
            return this.appName + '  by ' + this.author
        },
        filterUsers: function() {
            const search = this.querySearch.toLowerCase()
            return this.users.filter(function(user) {
                // return user.first_name.toLowerCase().includes(search)

                return Object.values(user).some(function(val) {
                    return String(val).toLowerCase().includes(search)
                })
            })
        }
    },

    methods: {
        addingUser() {
            const users = this.users

            // get last id
            let lastId = users[users.length-1].id
            
            // adding id new user
            let newUser = this.formUser
            newUser.id = lastId + 1
            
            users.push(newUser)
            this.resetFormUser()
        },
        updateUser(userSelected) {
            this.editUser = userSelected
        },
        destroyUser(userId) {
            const keyUser = this.getIndexUser(userId)
            const users = this.users

            let question = confirm('Are you sure delete ' + users[keyUser].first_name + '?')

            if(question) {
                users.splice(keyUser, 1)
                return
            }

            return
            
        },
        getIndexUser(userId) {
            const users = this.users

            for(let i = 0; i < users.length; i++) {
                const user = users[i]
                if(user.id == userId) {
                    return i
                }
            }
        },
        resetFormUser() {
            this.formUser = {
                first_name: '',
                last_name:'',
                gender: 'Male'
            }
        }
    },

    filters: {
        ucFirst: function(string) {
            if(!string) return ''
            string = String(string)
            return string.charAt(0).toUpperCase() + string.slice(1)
        }
    }
})