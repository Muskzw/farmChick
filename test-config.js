console.log('Testing expo/metro-config...');
try {
    require('expo/metro-config');
    console.log('✅ expo/metro-config loaded');
} catch (e) {
    console.error('❌ Failed to load expo/metro-config:', e.message);
}

console.log('Testing nativewind/metro...');
try {
    require('nativewind/metro');
    console.log('✅ nativewind/metro loaded');
} catch (e) {
    console.error('❌ Failed to load nativewind/metro:', e.message);
}

console.log('Testing metro.config.js...');
try {
    require('./metro.config.js');
    console.log('✅ metro.config.js loaded');
} catch (e) {
    console.error('❌ Failed to load metro.config.js:', e.message);
}
