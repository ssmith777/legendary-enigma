pipeline {
  environment {
  registry = "ssmith82/turnkey-api"
  registryCredential = 'dockerhub_id'
  dockerImage = ''
  COMPOSE_FILE = "docker-compose.yml"
}
agent any
  stages {
      stage('Cloning our Git') {
      steps {
        git 'https://github.com/ssmith777/legendary-enigma.git'
    }
    }
    stage('Building our image') {
      steps{
        script {
          dockerImage = docker.build registry //+ ":$BUILD_NUMBER:latest"
        }
      }
    }
    stage('Running Docker Container') {
        steps{
          sleep time: 30000, unit: 'MILLISECONDS'
          script {
              sh "docker-compose down"
              sh "docker rmi $registry:latest"
              sh "docker-compose up -d"
          }
        }
      }
      stage('Deploy our image') {
        steps{
          script {
            docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
            }
          }
        } 
      }
   
    // stage('Cleaning up') {
    //   steps{
          
    //   }
    // }
  }
}