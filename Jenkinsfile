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
                            bat 'npm install'
                        }
                    }
                }
                stage('Frontend') {
                    steps {
                        dir('Frontend') {
                            bat 'npm install'
                        }
                    }
                }
                stage('Backend') {
                    steps {
                        dir('Backend') {
                            bat 'npm install'
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
                            bat 'npm run build || echo "No build script in Admin"'
                        }
                    }
                }
                stage('Build Frontend') {
                    steps {
                        dir('Frontend') {
                            bat 'npm run build || echo "No build script in Frontend"'
                        }
                    }
                }
                stage('Start Backend') {
                    steps {
                        dir('Backend') {
                            bat 'npm run start || echo "No start script in Backend"'
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
