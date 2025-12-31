pipeline {
    agent any

    tools {
        jdk 'jdk17'
        nodejs 'node23'
    }

    environment {
        SCANNER_HOME = tool 'sonar-scanner'

        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')

        KUBECONFIG_CREDENTIALS = credentials('k8s-kubeconfig')
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout from Git') {
            steps {
                git 'https://github.com/KetuCoder/Doctor-Appointment.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh """
                    ${SCANNER_HOME}/bin/sonar-scanner \
                    -Dsonar.projectName=DAppointment \
                    -Dsonar.projectKey=DAppointment
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    dir('Backend') {
                        sh 'npm install'
                }
                    dir('Frontend') {
                        sh 'npm install'
                    }
                }
            }
        }


        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit',
                                odcInstallation: 'DP-Check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }

        stage('Trivy FS Scan') {
            steps {
                sh 'trivy fs ./Backend > trivyfs-backend.txt'
                sh 'trivy fs ./Frontend > trivyfs-frontend.txt'
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    sh """
                    docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}
                    """

                    dir('Backend') {
                        sh '''
                        docker build -t cloudketan/backend:1 .
                        docker push cloudketan/backend:1
                        '''
                    }

                    dir('Frontend') {
                        sh '''
                        docker build -t cloudketan/frontend:2 .
                        docker push cloudketan/frontend:2
                        '''
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                    export KUBECONFIG=${KUBECONFIG_CREDENTIALS}
                    kubectl version --client
                    kubectl get nodes
                    """

                    dir('Backend/K8s') {
                        sh 'kubectl apply -f .'
                    }

                    dir('Frontend/K8s') {
                        sh 'kubectl apply -f .'
                    }
                }
            }
        }
    }
}
