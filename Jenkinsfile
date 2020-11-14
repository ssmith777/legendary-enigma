pipeline {
  environment {
  registry = "ssmith82/turnkey-api"
  registryCredential = 'ssmith82'
  dockerImage = ''
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
    stage('Deploy our image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
          dockerImage.push()
          }
        }
      }
    }
    stage('Cleaning up') {
      steps{
        sh "docker rmi $registry:$BUILD_NUMBER"
      }
    }
  }
}