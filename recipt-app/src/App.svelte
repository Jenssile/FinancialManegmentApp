<script>
    import { fade } from "svelte/transition"
    import Inputfield from "./Inputfield.svelte"
    import ItemList from "./ItemList.svelte"
    import Loginpage from "./Loginpage.svelte"
    let user = {
        "username": "Jhon",
        "password": "123",
        "loggedIn": false
    }
    let defaultID = 0
    let itemName = ""
    let itemCost = ""
    let reciptid = ""
    $: inputs = [{"itemName": itemName, "itemCost": itemCost, "itemID": defaultID}]
    // to update the ui you need to rebuild the arry, that is why i first deconstruct the arry with ...inputs
    const AddInput = () => { inputs = [...inputs, {"itemName":"", "itemCost":"", "itemID": () => {inputs[inputs.length -1].itemID +1}}] }
    const RmInput = () => { inputs.length = inputs.length -1 }

    const update = (event) => {
        console.log(event)
        inputs[event.detail[2]].itemName = event.detail[0]
        inputs[event.detail[2]].itemCost = event.detail[1]
        inputs = inputs
    }

    const doPost = async () => {
        let data = []
        inputs.forEach(element => {
            // btoa is made for backwards compatibilty but i am using it here as this is a demo application
            let newEntry = {"itemName": btoa(element.itemName), "itemCost": btoa(element.itemCost)}
            data.push(newEntry)
        })
        console.log(data)
        const res = await fetch('http://localhost:3000/StoreData', {
            method: 'POST',
            body: JSON.stringify({
                reciptid,
                data
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        
        const json = await res.json()
        console.log(JSON.stringify(json))
    }
</script>

<main>
    {#if user.loggedIn}
        <div in:fade class="container">
            <div class="flexyitem">
                <button class="Blue" on:click={AddInput}>Add Item</button>
                <button class="Red" on:click={RmInput}>Remove Item</button>
                <button class="Orange" on:click={doPost}>Send to server</button>
                <br />
                {#each inputs as {itemID, itemName, itemCost}, iID (itemID)}
                    <Inputfield {itemName} {itemCost} {iID} on:update={update}/>
                {/each}
            </div>
            <div class="flexyitem">
                <h3>Current shopping list</h3>
                {#key inputs}
                    {#each inputs as {itemName, itemCost}}
                        <ItemList {itemName} {itemCost} />
                    {/each}
                {/key}
            </div>
        </div>
    {:else}
        <Loginpage on:login={(e) => {
            user.loggedIn = e.detail.loggedIn
            user.username = e.detail.username
            user.password = e.detail.password
            reciptid = e.detail.reciptid
        }} {...user}/>
    {/if}
</main>

<style>
    .Blue {
        background-color: #0066ff;
        color: white;
    }
    .Red {
        background-color: #990033;
        color: white;
    }
    .Orange {
        background-color: #ed9015;
        color: white;
    }
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: flex-start;
    }
    .flexyitem {
       width: 49.9%;
    }
</style>