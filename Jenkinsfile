pipeline {
  environment {
  registry = "ssmith82/turnkey-api"
  registryCredential = 'dockerhub_id'
  dockerImage = ''
  COMPOSE_FILE = "docker-compose.yml"
  PREV_BUILD = "${Int.parseInt($BUILD_NUMBER) - 1}"
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
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Running Docker Container') {
        steps{
          sleep time: 30000, unit: 'MILLISECONDS'
          script {
              sh "docker-compose down"
              sh "docker rmi $registry:$PREV_BUILD" 
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