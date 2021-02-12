if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const worker of registrations) {
        }
    });

    // if (window.navigator.standalone === true) {
    //     console.log('display-mode is standalone');
    // }
    //
    //
    // window.addEventListener('appinstalled', (evt) => {
    //     console.log('a2hs installed');
    // });


    // btnInstall.addEventListener('click', () => {
    //     // Update the install UI to remove the install button
    //     document.querySelector('#install-button').disabled = true;
    //     // Show the modal add to home screen dialog
    //     installPromptEvent.prompt();
    //     // Wait for the user to respond to the prompt
    //     installPromptEvent.userChoice.then((choice) => {
    //         if (choice.outcome === 'accepted') {
    //             console.log('User accepted the A2HS prompt');
    //         } else {
    //             console.log('User dismissed the A2HS prompt');
    //         }
    //         // Clear the saved prompt since it can't be used again
    //         installPromptEvent = null;
    //     });
    // });



    // if (window.navigator.standalone === true) {
    //     console.log('display-mode is standalone');
    // }

    //
    // var deferredPrompt;
    //
    //
    // window.addEventListener('beforeinstallprompt', (e) => {
    //     // Prevent Chrome 67 and earlier from automatically showing the prompt
    //     e.preventDefault();
    //     // Stash the event so it can be triggered later.
    //     deferredPrompt = e;
    //
    //     showAddToHomeScreen();
    //
    //     // deferredPrompt.prompt();
    //     //     // Wait for the user to respond to the prompt
    //     //     deferredPrompt.userChoice
    //     //         .then((choiceResult) => {
    //     //             if (choiceResult.outcome === 'accepted') {
    //     //                 console.log('User accepted the A2HS prompt');
    //     //             } else {
    //     //                 console.log('User dismissed the A2HS prompt');
    //     //             }
    //     //             deferredPrompt = null;
    //     //         });
    // });
    //
    //
    // function showAddToHomeScreen() {
    //
    //     var a2hsBtn = document.querySelector(".ad2hs-prompt");
    //
    //     a2hsBtn.style.display = "block";
    //
    //     a2hsBtn.addEventListener("click", addToHomeScreen);
    //
    // }
    //
    //
    // function addToHomeScreen() {
    //     var a2hsBtn = document.querySelector(".ad2hs-prompt");  // hide our user interface that shows our A2HS button
    //
    //     a2hsBtn.style.display = 'none';  // Show the prompt
    //
    //     deferredPrompt.prompt();  // Wait for the user to respond to the prompt
    //     deferredPrompt.userChoice
    //         .then(function(choiceResult){
    //
    //             if (choiceResult.outcome === 'accepted') {
    //                 console.log('User accepted the A2HS prompt');
    //             } else {
    //                 console.log('User dismissed the A2HS prompt');
    //             }
    //
    //             deferredPrompt = null;
    //
    //         });}
}
