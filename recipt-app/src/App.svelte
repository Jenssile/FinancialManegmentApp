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
</script>

<main>
    <div class="container">
        <div class="flexyitem">
            <button class="Blue" on:click={AddInput}>Add Item</button>
            <button class="Red" on:click={RmInput}>Remove Item</button>
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