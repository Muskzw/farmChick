const api = {
    cache: () => { },
    assertVersion: () => { },
    caller: (cb) => cb({ name: 'metro' }),
    env: () => 'development',
};

function inspect(name, fn) {
    console.log(`Inspecting ${name}...`);
    try {
        const result = fn(api);
        console.log(`${name} keys:`, Object.keys(result));
        if (result.plugins) console.log(`${name} has plugins -> IT IS A PRESET`);
        if (result.visitor) console.log(`${name} has visitor -> IT IS A PLUGIN`);
        if (!result.plugins && !result.visitor) console.log(`${name} returns unknown structure`);
    } catch (e) {
        console.error(`Error executing ${name}:`, e.message);
    }
}

try {
    const nativeWind = require('nativewind/babel');
    inspect('nativewind/babel', nativeWind);
} catch (e) {
    console.error('Error loading nativewind/babel:', e.message);
}

try {
    const expoPreset = require('babel-preset-expo');
    inspect('babel-preset-expo', expoPreset);
} catch (e) {
    console.error('Error loading babel-preset-expo:', e.message);
}
