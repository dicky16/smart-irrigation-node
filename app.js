const mqtt = require('mqtt')

const axios = require('axios')
const url = "http://localhost:8000/api"

const username = "client"
const password = "client"
const port = 1884
const host = 'mqtt://devmyeco.my.id'
const clientId = "mqtt_local_dev"

const topic = "sensor/1/#"

const options = {
    clientId,
    username,
    password,
    port
}

const client = mqtt.connect(host, options)

client.subscribe(topic)

/* get received message */
client.on('message', async (topic, message) => {
    console.log(topic)
    console.log(message.toString())
    try {
        if(topic == "sensor/1/PH") {
            const PH = message.toString()
            const response = await axios({
                method: 'get',
                url: url + "/" + "PH",
                data: {
                    PH
                }
            })
            console.log(response.data)
        }
    } catch (error) {
        console.log("insert data error " + error.message)
    }
})

client.on('connect', function() {
    console.log("connected")
})

client.on('reconnect', function() {
    client = mqtt.connect(host, options)
})