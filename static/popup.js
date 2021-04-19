class Popup {
    constructor(name) {
        this.name = name;

        var closeBtn = '<button onclick="closePopup()" style="float:right;">x</button>';
        var title = '<h3>'+this.name+'</h3>';
        this.html = closeBtn + title;

        this.inputs = [];
    }

    /**
     * Adds a checkbox input to the popup's html
     * @param {String} id 
     * @param {String} name 
     * @param {String} label 
     */
    addCheckboxInput(id, name, label) {
        var html = '<input type="checkbox" id="'+id+'" name="'+name+'"><label for="'+name+'">'+label+'</label><br>';
        this.html += html;
        this.inputs.push({
            id: id,
            type: 'checkbox',
            name: name
        });
    }

    /**
     * Adds a text input to the popup's html
     * @param {String} id 
     * @param {String} name 
     * @param {String} label 
     * @param {String} placeholder 
     */
    addTextInput(id, name, label, placeholder) {
        var html = '<label for="'+name+'">'+label+': </label><input type="text" id="'+id+'" name="'+name+'" placeholder="'+placeholder+'"><br>';
        this.html += html;
        this.inputs.push({
            id: id,
            type: 'text',
            name: name
        });
    }

    /**
     * Adds a number input to the popup's html
     * @param {String} id 
     * @param {String} name 
     * @param {String} label 
     * @param {number} min 
     * @param {number} max 
     */
    addNumberInput(id, name, label, min, max) {
        var html = '<label for="'+name+'">'+label+': </label><input type="number" id="'+id+'" name="'+name+'" min="'+min+'" max="'+max+'"><br>';
        this.html += html;
        this.inputs.push({
            id: id,
            type: 'number',
            name: name
        });
    }

    addText(text) {
        var html = '<p>'+text+'</p>';
        this.html += html;
    }

    /**
     * Adds the popup's html to the popup div in the html
     */
    addToHTML() {
        var content = this.html;
        if(this.inputs.length > 0) {
            content += '<br><button id="popupEnterBtn">Enter</button>';
        }
        $('#popup').append(content);
    }
}

/**
 * Displays the popup on screen
 */
function displayPopup() {
    $('#popup').css('visibility', 'visible');
    $('#popup-background').css('visibility', 'visible');
}

/**
 * Hides the popup from view and empties the popup div
 */
function closePopup() {
    $('#popup').css('visibility', 'hidden');
    $('#popup').empty();
}

/**
 * Creates and adds an add server popup
 */
function addServerPopup() {
    let popup = new Popup('Add a Server');

    popup.addTextInput('userInput', 'route', 'Server Address', 'Server Address');
    popup.addCheckboxInput('status', 'status', 'Add Status');
    popup.addCheckboxInput('controls', 'controls', 'Add Controls');
    popup.addCheckboxInput('queue', 'queue', 'Add Queue');

    popup.addToHTML();

    $('#popupEnterBtn').click(function() {
        addServer(popup);
    });

    displayPopup();
}

function addTaskPopup(serverKey, x, y) {
    var server = getServer(serverKey);

    server.getQueue(function(result) {
        var title = 'Task: ' + result[x][y].task.task_name;
        let popup = new Popup(title);

        // TODO make task show as JsTree
        var task = JSON.stringify(result[x][y].task);
        popup.addText(task);

        popup.addToHTML();
        $('#popup').css('visibility', 'visible');
    });
}