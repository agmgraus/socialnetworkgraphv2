import { Visual } from "../../src/visual";
var powerbiKey = "powerbi";
var powerbi = window[powerbiKey];

var socialNetworkGraph99E9F31DDFD7429BACA50118466E4D11 = {
    name: 'socialNetworkGraph99E9F31DDFD7429BACA50118466E4D11',
    displayName: 'Social Network Graph',
    class: 'Visual',
    version: '2.1.28',
    apiVersion: '2.6.0',
    create: (options) => {
        if (Visual) {
            return new Visual(options);
        }

        console.error('Visual instance not found');
    },
    custom: true
};

if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["socialNetworkGraph99E9F31DDFD7429BACA50118466E4D11"] = socialNetworkGraph99E9F31DDFD7429BACA50118466E4D11;
}

export default socialNetworkGraph99E9F31DDFD7429BACA50118466E4D11;