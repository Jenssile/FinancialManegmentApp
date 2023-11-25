<script>
    import Inputfield from "./Inputfield.svelte"
    import ItemList from "./ItemList.svelte"
    let defaultID = 0
    let itemName = ""
    let itemCost = ""
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
        const res = await fetch('http://localhost:3000/StoreData', {
            method: 'POST',
            body: JSON.stringify({
                inputs
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        
        const json = await res.json()
        console.log(JSON.stringify(json))
    }

    const newID = async () => {
        const res = await fetch('http://localhost:3000/GetReciptID', {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        })
        
        const json = await res.json()
        console.log(JSON.stringify(json))
    }
</script>

<main>
    <div class="container">
        <div class="flexyitem">
            <button class="Blue" on:click={AddInput}>Add Item</button>
            <button class="Red" on:click={RmInput}>Remove Item</button>
            <button class="Orange" on:click={doPost}>Send to server</button>
            <button class="Orange" on:click={newID}>Get Recipt id</button>
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