var cluster = require('cluster');
var os = require('os');
var logger = require('./src/middlewares/logger');

const cpus = os.cpus();

if(cluster.isMaster){
	cpus.forEach(function(){
		cluster.fork();
	});
	
	cluster.on("listening", function(worker){
		var msg = "Cluster "+worker.process.pid+" conectado";
		console.log(msg);
		logger.info(msg);
	});
	
	cluster.on("disconnect", function(worker){
		var msg = "Cluster "+worker.process.pid+" desconectado";
		console.log(msg);
		logger.info(msg);
	});
	
	cluster.on("exit", function(worker){
		var msg = "Cluster "+worker.process.pid+" saiu do ar";
		console.log(msg);
		logger.info(msg);
		cluster.fork();
	});
	
}else{
	require('./server.js');
}