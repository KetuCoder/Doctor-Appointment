pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/KetuCoder/Doctor-Appointment.git'
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Admin') {
                    steps {
                        dir('Admin') {
                            sh 'npm install'
                        }
                    }
                }
                stage('Frontend') {
                    steps {
                        dir('Frontend') {
                            sh 'npm install'
                        }
                    }
                }
                stage('Backend') {
                    steps {
                        dir('Backend') {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Build/Run Apps') {
            parallel {
                stage('Build Admin') {
                    steps {
                        dir('Admin') {
                            sh 'npm run build || echo "No build script in Admin"'
                        }
                    }
                }
                stage('Build Frontend') {
                    steps {
                        dir('Frontend') {
                            sh 'npm run build || echo "No build script in Frontend"'
                        }
                    }
                }
                stage('Start Backend') {
                    steps {
                        dir('Backend') {
                            sh 'npm run start || echo "No start script in Backend"'
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
