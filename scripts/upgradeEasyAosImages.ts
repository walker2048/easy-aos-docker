#!/usr/bin/env node
import { exec } from "child_process"
import * as fs from "fs"

let result: string[] = []
let data = new Date()

let settings = {
	setUpgrade: true
}

const setUpgrade = function () {
	fs.writeFileSync("/home/walker/easy-aos-docker/update", JSON.stringify(settings))
}

const triggerBuild = function () {
	exec("curl -H 'Content-Type: application/json' --data '{\"build\": true}' -X POST https://registry.hub.docker.com/u/walker2048/easy-aos/trigger/0f60a37f-2a9f-49f9-b466-9114f0778fb2/", (err, stdout) => {
		if (err) {
			result.push(`Images build request failt at ${data.toLocaleDateString()}`)
		} else {
			if (/OK/.test(stdout)) {
				result.push(`Images build request success at ${data.toLocaleDateString()}`)
			}
		}
		result.forEach((line) => {
			console.log(line)
		})
	})
}

exec("docker run  --name build -t --rm walker2048/easy-aos:slim pip list --outdate 2>&1", (err, dockerPipList) => {
	let match = /aos-cube[^\d]+(?<version>\d+\.\d+\.?[^\/+ \r\n]{0,}\b)[^\d]+(?<latest>\d+\.\d+\.?[^\/+ \r\n]{0,}\b)/.exec(dockerPipList)
	if (match) {
		result.push(`aos-cube ${match.groups!.version} is outdate, latest version is ${match.groups!.latest}`)
		setUpgrade()
		triggerBuild()
	} else {
		result.push(`${data.toLocaleDateString()} ${data.toLocaleTimeString}: aos-cube is up to date`)
	}
})

