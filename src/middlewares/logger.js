var fs = require('fs');
var winston = require('winston');

if (!fs.existsSync("logs")) {
	fs.mkdirSync("logs");
}

module.exports = new winston.Logger({
	transports: [
//       new winston.transports.Console(),
         new winston.transports.File({
        	 name: 'info-file',
    		 filename: "logs/app-info.log",
        	 level: "info",
        	 maxsize: 1048576,
        	 maxFiles: 10,
        	 colorize: false
         }),
         new winston.transports.File({
        	 name: 'error-file',
        	 filename: "logs/app-error.log",
        	 level: "error",
        	 handleExceptions: true,
             json: true,
        	 maxsize: 1048576,
        	 maxFiles: 10,
        	 colorize: false
         })
	]	
});