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
        
          dockerImage = docker.build registry + ":latest"

        }
      }
    }
    stage('Deploy our image') {
      steps{
        script {
          def version = readFile('VERSION')
          def versions = version.split('\\.')
          def major = versions[0]
          def minor = versions[0] + '.' + versions[1]
          def patch = version.trim()

          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
            dockerImage.push(major)
            dockerImage.push(minor)
            dockerImage.push(patch)
          }
        }
      } 
    }
    stage('Stop API') {
      steps{
        sleep time: 30000, unit: 'MILLISECONDS'
        script {
            sh "docker-compose down"
        }
      }
    }
    stage('Remove old Images') {
      steps{
        sleep time: 30000, unit: 'MILLISECONDS'
        script {
            sh "docker image prune -f"
        }
      }
    }
    stage('Running latest Build') {
      steps{
        sleep time: 30000, unit: 'MILLISECONDS'
        script {
            sh "docker-compose up -d"
        }
      }
    }
  }
}