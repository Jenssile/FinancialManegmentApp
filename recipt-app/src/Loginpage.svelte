<script>
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()
    let waiting = true
    export let username
    export let password
    export let loggedIn
    export let reciptid

    const newID = async () => {
        const res = await fetch('http://localhost:3000/GetReciptID', {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        })
        
        const json = await res.json()
        console.log(JSON.stringify(json))
        reciptid = json.reciptID
        waiting = false
    }

    const login = () => {
        loggedIn = true
        dispatch("login", {
            "username": username,
            "password": password,
            "loggedIn": loggedIn,
            "reciptid": reciptid
        })
    }

    newID()
</script>

<input type="text" name="username" placeholder="User Name" bind:value={username}>
<br>
<input type="password" name="password" placeholder="Password" bind:value={password}>
<br>
<!-- login func should be the one who gets the ID but for now the user is hard coded -->
<button on:click={login} disabled={waiting}>Login</button>

<style>
    button {
        background-color: lightseagreen;
        color: white;
    }
</style>