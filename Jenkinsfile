pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Website') {
            steps {
                bat 'dir website'
            }
        }

        stage('Archive Website') {
            steps {
                archiveArtifacts artifacts: 'website/**', fingerprint: true
            }
        }

        stage('Success') {
            steps {
                echo 'Website pipeline executed successfully!'
            }
        }
    }
}