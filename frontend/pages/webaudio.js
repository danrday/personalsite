import React, { Component } from 'react'
import Tone from 'tone'

class WebAudio extends Component {

    componentDidMount() {

        function onMIDIMessage (message) {
            const synth = new Tone.Synth().toMaster();
            synth.triggerAttackRelease("C4", "8n");
            console.log(message.data);
        }

        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess()
                .then(success, failure);
        }

        function success (midi) {
            console.log('Got midi!', midi);
            let inputs = midi.inputs.values();
            for (let input = inputs.next();
                 input && !input.done;
                 input = inputs.next()) {
                // each time there is a midi message call the onMIDIMessage function
                input.value.onmidimessage = onMIDIMessage;
            }
        }

        function failure () {
            console.error('No access to your midi devices.')
        }

        // listen to keyboard in case no midi device attached
        document.onkeypress = function (e) {
            function onKeyPress (key) {
                const synth = new Tone.Synth().toMaster();
                synth.triggerAttackRelease("C4", "50n");
            }
            e = e || window.event;
            onKeyPress(e.key)
        }

    }

    render() {
        return (
            <div>
                <div>Web Audio</div>
            </div>
        )
    }
}

export default WebAudio
