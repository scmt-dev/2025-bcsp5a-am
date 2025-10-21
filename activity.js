
const GRAPHQL_API_URL = 'https://wpitfaredsxfeudbwuzd.hasura.ap-southeast-1.nhost.run/v1/graphql'
const INSERT_ACTIVITY = `
mutation insert_activities_one($object: activities_insert_input!) {
    insert_activities_one(object: $object) {
        id
        amount
        type
        category
        description
        on_date
        created_at
        updated_at
    }
}
`
async function addActivities(input) {
    try {
        const TOKEN = localStorage.getItem('token')
        const req = await fetch(GRAPHQL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify({
                query: INSERT_ACTIVITY,
                variables: { 
                    object: input
                }
            })
        })
        const data = await req.json();
        console.log(data)
    } catch (error) {
        console.error(`Create activity failed: ${error}`);
    }
}