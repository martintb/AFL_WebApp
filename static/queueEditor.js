var queueTasks = []; // array for queued tasks

class Task {
    constructor(position, info) {
        this.position = position;
        this.info = info;

        var name = this.info.task.task_name;
        var uuid = this.info.uuid;
        this.html = '<input type="checkbox" id="'+uuid+'" name="'+name+'"><label for="'+name+'">['+this.position+'] '+name+' ('+uuid+')</label><br>';

        queueTasks.push(this);
        console.log(queueTasks);
    }

    }
}

// TODO complete the editQueue function
function editQueue(serverKey) {
    var server = getServer(serverKey);

    // pause the server
    server.getQueueState(function(result){
        console.log(result);
        if(result != 'Paused') {
            server.pause();
        }
    });

    // setup the queue editor w/ the server key
    server.getQueue(function(result) {
        for(let i in result[2]) {
            var tempTask = new Task(i, result[2][i]);
            console.log(tempTask);
        }

        var editorControls = '<button onclick="closeQueueEditor()" style="float:right;">x</button>';

        var tasks = '';
        for(let i in queueTasks) {
            tasks += queueTasks[i].html;
        }

        var content = editorControls + tasks;
        $('#queueEditor').html(content);
    });

    // display the queue editor w/ the popup background
    $('#queueEditor').css('visibility', 'visible');
    $('#popup-background').css('visibility', 'visible');
}

}