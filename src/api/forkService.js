import api from "@/api/index";
import parse from 'parse-link-header'

const forkService = {
  getRepoForks(name, page){
    return api.get(`/repos/${name}/forks`, {params: {page, per_page: 20}}).then((response) => {
      const pagination = parse(response.headers.link)
      let lastPage;
      if(pagination.last && pagination.last.page){
        lastPage = pagination.last.page
      }else{
        lastPage = page
      }
      return {
        data: response.data,
        lastPage: Number(lastPage)
      }
    })
  }
}

export default forkService
