import api from "@/api/index";

const forkService = {
  getRepoForks(name){
    return api.get(`/repos/${name}/forks`).then(({data}) => data)
  }
}

export default forkService
