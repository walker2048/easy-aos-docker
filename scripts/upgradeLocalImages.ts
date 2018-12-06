#!/usr/bin/env node
import { exec } from "child_process"
import * as fs from "fs"

fs.access("/home/walker/easy-aos-docker/update",(err)=> {
	if(err){

	} else {
		exec("docker rmi walker2048/easy-aos:slim", (err, rmi) => {
			if(err){
				console.log(err)
			} else {
				exec("docker pull walker2048/easy-aos:slim", (err, pull)=>{
					if(err){
						console.log(err)
					} else {
						exec("rm /home/walker/easy-aos-docker/update")
					}
				})
			}
		})
	}
})