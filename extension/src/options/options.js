function init() {
    restore_options()
    document.getElementById('save').addEventListener('click', save_options);
    document.getElementById('default').addEventListener('click', defaultChanged);
    document.getElementById('chambers').addEventListener('keypress', chamberKeyPress);
}

// Saves options to chrome.storage
function save_options() {
    var chambers = document.getElementById('chambers').value;
    var override = !document.getElementById('default').checked;
    if(chambers=='0') {
        // they probably mean 1
        chambers = 1;
    }
    chrome.storage.sync.set({
        chamberCount: chambers,
        override: override
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        chamberCount: '6',
        override: false
    }, function(items) {
        document.getElementById('chambers').value = items.chamberCount;
        document.getElementById('default').checked = !items.override;
        defaultChanged()
    });
}


function defaultChanged() {
    var isDefault = document.getElementById('default').checked;
    document.getElementById('chambers').disabled = isDefault;
}

function chamberKeyPress(event) {
    console.log('keypress');
    console.log(event);
    if (!(event.charCode >= 48 && event.charCode <= 57)) {
        event.preventDefault();
    }
}

document.addEventListener('DOMContentLoaded', init);
