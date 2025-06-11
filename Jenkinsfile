pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/KetuCoder/Doctor-Appointment.git'
            }
        }

        stage('Install Dependencies - Admin') {
            steps {
                dir('Admin') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Dependencies - Frontend') {
            steps {
                dir('Frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Dependencies - Backend') {
            steps {
                dir('Backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build/Run Apps (optional)') {
            parallel {
                stage('Run Admin') {
                    steps {
                        dir('Admin') {
                            sh 'npm run build || echo "No build script in Admin"'
                        }
                    }
                }
                stage('Run Frontend') {
                    steps {
                        dir('Frontend') {
                            sh 'npm run build || echo "No build script in Frontend"'
                        }
                    }
                }
                stage('Run Backend') {
                    steps {
                        dir('Backend') {
                            sh 'npm run start || echo "No start script in Backend"'
                        }
                    }
                }
            }
        }
    }
}
