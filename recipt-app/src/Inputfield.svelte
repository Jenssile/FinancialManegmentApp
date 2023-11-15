<script>
    import { createEventDispatcher } from "svelte"
    export let itemName = ""
    export let itemCost = ""
    export let iID = 0
    const dispatch = createEventDispatcher()
    const update = () => dispatch("update", [itemName, itemCost, iID])
</script>

<input type="text" name="itemName" placeholder="Item Name" bind:value={itemName}>
<input type="text" name="itemCost" placeholder="Cost of item" bind:value={itemCost}>
<button on:click={update} >Update Item</button>
<br/>

<style>
    button {
        background-color: green;
        color: white;
    }
</style>