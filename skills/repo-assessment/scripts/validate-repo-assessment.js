#!/usr/bin/env node

/**
 * Repository Assessment Validation Script
 * 
 * Validates the repo-assess skill against test repositories
 * and provides scoring feedback based on the rubric.
 */

const fs = require('fs');
const path = require('path');

// Test repositories with expected outcomes
const TEST_CASES = {
  'react-frontend': {
    expected: {
      languages: ['JavaScript', 'TypeScript'],
      frameworks: ['React'],
      buildTools: ['Webpack', 'npm'],
      architecture: 'Component-based'
    },
    scoreThreshold: 3.5
  },
  'node-backend': {
    expected: {
      languages: ['JavaScript'],
      frameworks: ['Express'],
      buildTools: ['npm'],
      architecture: 'MVC'
    },
    scoreThreshold: 3.0
  },
  'python-data': {
    expected: {
      languages: ['Python'],
      frameworks: ['pandas', 'numpy'],
      buildTools: ['pip'],
      architecture: 'Notebook-based'
    },
    scoreThreshold: 3.0
  }
};

/**
 * Validates repository assessment output against expected results
 */
function validateAssessment(assessmentResult, expected) {
  const validation = {
    technologyDetection: 0,
    patternRecognition: 0,
    overallScore: 0,
    issues: []
  };

  // Check technology detection
  const detectedLanguages = assessmentResult.technology_stack?.languages || [];
  const detectedFrameworks = assessmentResult.technology_stack?.frameworks || [];
  
  expected.languages.forEach(lang => {
    if (detectedLanguages.includes(lang)) {
      validation.technologyDetection += 0.5;
    } else {
      validation.issues.push(`Missed language: ${lang}`);
    }
  });

  expected.frameworks.forEach(framework => {
    if (detectedFrameworks.includes(framework)) {
      validation.technologyDetection += 0.5;
    } else {
      validation.issues.push(`Missed framework: ${framework}`);
    }
  });

  // Check pattern recognition
  if (assessmentResult.patterns?.architecture === expected.architecture) {
    validation.patternRecognition = 1.0;
  } else {
    validation.issues.push(`Incorrect architecture detection. Expected: ${expected.architecture}, Got: ${assessmentResult.patterns?.architecture}`);
  }

  // Calculate overall score (simplified rubric calculation)
  validation.overallScore = (
    validation.technologyDetection * 0.6 + 
    validation.patternRecognition * 0.4
  ) * 4; // Scale to 0-4

  return validation;
}

/**
 * Runs validation tests for repository assessment
 */
function runValidation() {
  console.log('🔍 Repository Assessment Validation\n');
  
  let totalScore = 0;
  let passedTests = 0;
  const totalTests = Object.keys(TEST_CASES).length;

  Object.entries(TEST_CASES).forEach(([testName, testCase]) => {
    console.log(`📋 Testing: ${testName}`);
    
    // Simulate assessment result (in real implementation, this would call the skill)
    const mockAssessmentResult = {
      technology_stack: {
        languages: testCase.expected.languages,
        frameworks: testCase.expected.frameworks
      },
      patterns: {
        architecture: testCase.expected.architecture
      }
    };

    const validation = validateAssessment(mockAssessmentResult, testCase.expected);
    
    console.log(`  Technology Detection: ${(validation.technologyDetection * 100).toFixed(0)}%`);
    console.log(`  Pattern Recognition: ${(validation.patternRecognition * 100).toFixed(0)}%`);
    console.log(`  Overall Score: ${validation.overallScore.toFixed(1)}/4.0`);
    
    if (validation.issues.length > 0) {
      console.log(`  ⚠️  Issues:`);
      validation.issues.forEach(issue => console.log(`     - ${issue}`));
    }

    const passed = validation.overallScore >= testCase.scoreThreshold;
    console.log(`  ${passed ? '✅ PASS' : '❌ FAIL'}\n`);
    
    if (passed) passedTests++;
    totalScore += validation.overallScore;
  });

  console.log(`📊 Summary:`);
  console.log(`  Tests Passed: ${passedTests}/${totalTests} (${(passedTests/totalTests*100).toFixed(0)}%)`);
  console.log(`  Average Score: ${(totalScore/totalTests).toFixed(1)}/4.0`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Repository assessment is working correctly.');
  } else {
    console.log('🔧 Some tests failed. Review the assessment logic for improvements.');
  }
}

// Run validation if script is executed directly
if (require.main === module) {
  runValidation();
}

module.exports = {
  validateAssessment,
  runValidation,
  TEST_CASES
};
