// DOM Elements
const videoInput = document.getElementById('videoInput');
const uploadArea = document.getElementById('uploadArea');
const uploadBtn = document.getElementById('uploadBtn');
const videoPreview = document.getElementById('videoPreview');
const previewVideo = document.getElementById('previewVideo');
const videoName = document.getElementById('videoName');
const removeVideoBtn = document.getElementById('removeVideoBtn');
const analysisSection = document.getElementById('analysisSection');
const analyzeBtn = document.getElementById('analyzeBtn');
const analysisType = document.getElementById('analysisType');
const progressSection = document.getElementById('progressSection');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const resultsSection = document.getElementById('resultsSection');
const logoutBtn = document.getElementById('logoutBtn');

let currentVideoFile = null;

// Check if user is logged in (redirect if not)
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'index.html';
    }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
});

// Upload button click
uploadBtn.addEventListener('click', () => {
    videoInput.click();
});

// Drag and drop functionality
uploadArea.addEventListener('click', () => {
    videoInput.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('video/')) {
        handleVideoFile(files[0]);
    }
});

// File input change
videoInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleVideoFile(e.target.files[0]);
    }
});

// Handle video file
function handleVideoFile(file) {
    if (file.size > 500 * 1024 * 1024) {
        alert('File size exceeds 500MB. Please upload a smaller file.');
        return;
    }

    currentVideoFile = file;
    const videoURL = URL.createObjectURL(file);
    previewVideo.src = videoURL;
    videoName.textContent = file.name;
    uploadArea.style.display = 'none';
    videoPreview.style.display = 'block';
    analysisSection.style.display = 'block';
}

// Remove video
removeVideoBtn.addEventListener('click', () => {
    currentVideoFile = null;
    previewVideo.src = '';
    uploadArea.style.display = 'block';
    videoPreview.style.display = 'none';
    analysisSection.style.display = 'none';
    resultsSection.style.display = 'none';
    videoInput.value = '';
});

// Analysis button click
analyzeBtn.addEventListener('click', async () => {
    if (!currentVideoFile) {
        alert('Please upload a video first!');
        return;
    }

    analyzeBtn.disabled = true;
    progressSection.style.display = 'block';
    resultsSection.style.display = 'none';
    
    const selectedType = analysisType.value;
    
    // Simulate video analysis (in real app, this would call a backend API)
    await simulateVideoAnalysis(selectedType);
    
    analyzeBtn.disabled = false;
});

// Simulate video analysis with CNN/RNN
async function simulateVideoAnalysis(type) {
    const analysisSteps = [
        { text: 'Loading video...', progress: 10 },
        { text: 'Extracting frames...', progress: 25 },
        { text: 'Running ' + type.toUpperCase() + ' model...', progress: 50 },
        { text: 'Analyzing movements...', progress: 70 },
        { text: 'Calculating metrics...', progress: 85 },
        { text: 'Generating report...', progress: 100 }
    ];

    for (const step of analysisSteps) {
        progressText.textContent = step.text;
        progressBar.style.width = step.progress + '%';
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Generate mock analysis results
    const results = generateAnalysisResults(type);
    
    progressSection.style.display = 'none';
    displayResults(results);
}

// Generate mock analysis results
function generateAnalysisResults(type) {
    const baseSpeed = 75 + Math.random() * 20;
    const baseAgility = 70 + Math.random() * 25;
    const baseCoordination = 80 + Math.random() * 15;
    
    // Adjust based on analysis type
    let speedMultiplier = 1;
    let agilityMultiplier = 1;
    let coordinationMultiplier = 1;
    
    if (type === 'rnn') {
        speedMultiplier = 1.1;
        agilityMultiplier = 1.15;
    } else if (type === 'hybrid') {
        speedMultiplier = 1.2;
        agilityMultiplier = 1.2;
        coordinationMultiplier = 1.1;
    }

    const speedScore = Math.round(baseSpeed * speedMultiplier);
    const agilityScore = Math.round(baseAgility * agilityMultiplier);
    const coordinationScore = Math.round(baseCoordination * coordinationMultiplier);
    const overallRating = Math.round((speedScore + agilityScore + coordinationScore) / 3);

    return {
        metrics: {
            speed: speedScore,
            agility: agilityScore,
            coordination: coordinationScore,
            overall: overallRating
        },
        movements: [
            { time: '0:05', movement: 'Sprint Start', quality: 'Excellent', confidence: 95 },
            { time: '0:12', movement: 'Direction Change', quality: 'Good', confidence: 87 },
            { time: '0:18', movement: 'Jump Action', quality: 'Excellent', confidence: 92 },
            { time: '0:25', movement: 'Balance Recovery', quality: 'Good', confidence: 83 },
            { time: '0:32', movement: 'Acceleration', quality: 'Excellent', confidence: 91 }
        ],
        techniques: [
            { technique: 'Posture', score: 88, feedback: 'Maintains good posture throughout most movements' },
            { technique: 'Arm Movement', score: 82, feedback: 'Effective arm coordination during sprint' },
            { technique: 'Foot Placement', score: 90, feedback: 'Excellent foot positioning and landing' },
            { technique: 'Balance', score: 85, feedback: 'Good balance control during direction changes' }
        ],
        recommendations: [
            'Focus on improving initial acceleration phase',
            'Work on maintaining speed during direction changes',
            'Practice balance drills to enhance stability',
            'Consider strength training for power generation',
            'Review and refine arm swing technique'
        ],
        timeline: generateTimelineData(),
        keyMoments: [
            { time: '0:08', event: 'Peak Speed Achieved', description: 'Reached maximum velocity of 8.5 m/s' },
            { time: '0:15', event: 'Agility Test', description: 'Successful rapid direction change' },
            { time: '0:22', event: 'Power Jump', description: 'Maximum vertical jump height: 65cm' },
            { time: '0:28', event: 'Recovery Phase', description: 'Quick balance recovery after landing' }
        ]
    };
}

// Generate timeline data for chart
function generateTimelineData() {
    const data = [];
    for (let i = 0; i < 30; i++) {
        data.push({
            time: i,
            speed: 60 + Math.random() * 30,
            agility: 65 + Math.random() * 25,
            coordination: 75 + Math.random() * 20
        });
    }
    return data;
}

// Display analysis results
function displayResults(results) {
    // Update metrics
    document.getElementById('speedScore').textContent = results.metrics.speed + '/100';
    document.getElementById('agilityScore').textContent = results.metrics.agility + '/100';
    document.getElementById('coordinationScore').textContent = results.metrics.coordination + '/100';
    document.getElementById('overallRating').textContent = results.metrics.overall + '/100';

    // Update movements
    const movementList = document.getElementById('movementList');
    movementList.innerHTML = '';
    results.movements.forEach(movement => {
        const item = document.createElement('div');
        item.className = 'movement-item';
        item.innerHTML = `
            <strong>${movement.time}</strong> - ${movement.movement}<br>
            Quality: ${movement.quality} (${movement.confidence}% confidence)
        `;
        movementList.appendChild(item);
    });

    // Update techniques
    const techniqueAnalysis = document.getElementById('techniqueAnalysis');
    techniqueAnalysis.innerHTML = '';
    results.techniques.forEach(technique => {
        const item = document.createElement('div');
        item.className = 'technique-item';
        item.innerHTML = `
            <strong>${technique.technique}:</strong> ${technique.score}/100<br>
            ${technique.feedback}
        `;
        techniqueAnalysis.appendChild(item);
    });

    // Update recommendations
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';
    results.recommendations.forEach(rec => {
        const item = document.createElement('li');
        item.textContent = rec;
        recommendationsList.appendChild(item);
    });

    // Update key moments
    const keyMoments = document.getElementById('keyMoments');
    keyMoments.innerHTML = '';
    results.keyMoments.forEach(moment => {
        const item = document.createElement('div');
        item.className = 'key-moment-item';
        item.innerHTML = `
            <strong>${moment.time}</strong> - ${moment.event}<br>
            ${moment.description}
        `;
        keyMoments.appendChild(item);
    });

    // Draw performance chart
    drawPerformanceChart(results.timeline);

    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Draw performance chart
function drawPerformanceChart(timelineData) {
    const canvas = document.getElementById('performanceChart');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const maxValue = 100;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    ctx.strokeStyle = '#8338ec';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw speed line
    ctx.strokeStyle = '#ff006e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    timelineData.forEach((point, index) => {
        const x = padding + (index / (timelineData.length - 1)) * chartWidth;
        const y = canvas.height - padding - (point.speed / maxValue) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // Draw agility line
    ctx.strokeStyle = '#3a86ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    timelineData.forEach((point, index) => {
        const x = padding + (index / (timelineData.length - 1)) * chartWidth;
        const y = canvas.height - padding - (point.agility / maxValue) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // Draw coordination line
    ctx.strokeStyle = '#06ffa5';
    ctx.lineWidth = 3;
    ctx.beginPath();
    timelineData.forEach((point, index) => {
        const x = padding + (index / (timelineData.length - 1)) * chartWidth;
        const y = canvas.height - padding - (point.coordination / maxValue) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Performance Over Time', canvas.width / 2 - 100, 20);
    ctx.fillText('Speed', padding - 30, 20);
    ctx.fillText('Agility', padding - 30, 50);
    ctx.fillText('Coordination', padding - 30, 80);
}

// Download report
document.getElementById('downloadReportBtn').addEventListener('click', () => {
    const reportContent = generateReportContent();
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sports_analysis_report_${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
});

function generateReportContent() {
    const metrics = {
        speed: document.getElementById('speedScore').textContent,
        agility: document.getElementById('agilityScore').textContent,
        coordination: document.getElementById('coordinationScore').textContent,
        overall: document.getElementById('overallRating').textContent
    };

    return `
SPORTS PERFORMANCE ANALYSIS REPORT
Generated: ${new Date().toLocaleString()}
=====================================

PERFORMANCE METRICS
-------------------
Speed Score: ${metrics.speed}
Agility Score: ${metrics.agility}
Coordination: ${metrics.coordination}
Overall Rating: ${metrics.overall}

ANALYSIS TYPE: ${analysisType.options[analysisType.selectedIndex].text}

This report was generated using advanced ${analysisType.value.toUpperCase()} analysis.
For detailed video analysis, please use the web interface.
    `;
}

// Handle window resize for chart
window.addEventListener('resize', () => {
    if (resultsSection.style.display !== 'none') {
        const canvas = document.getElementById('performanceChart');
        if (canvas) {
            drawPerformanceChart(generateTimelineData());
        }
    }
});

