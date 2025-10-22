import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const uri = import.meta.env.VITE_API_URI || 'http://localhost:3000'
axios.defaults.baseURL = uri

function Atividades() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const id = state?.turmaId || ''
  const turma = state?.nome || ''
  const professor = JSON.parse(window.localStorage.getItem('professor') ?? '{}')
  const [atividades, setAtividades] = useState<Array<{ id: number; descricao: string }>>([])

  const [open, setOpen] = useState(false)
  const [descricao, setDescricao] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!professor.id) {
      window.localStorage.removeItem('professor')
      sair()
      return
    }
    loadAtividades()
  }, [])

  function loadAtividades() {
    axios.get('/atividade/' + id)
      .then(response => { setAtividades(response.data) })
      .catch(error => {
        console.error('Erro ao buscar atividades:', error)
      })
  }

  function sair() {
    navigate('/home')
  }

  return (
    <>
      <header className="w-full bg-blue-700 text-white flex flex-row items-center justify-between p-4 shadow-lg">
        <h1 className="font-bold text-lg">{professor.nome}</h1>
        <Button
          variant="destructive"
          className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-lg"
          onClick={sair}
        >
          Sair
        </Button>
      </header>

      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-3xl space-y-6 flex flex-col">
          <div className="w-full flex justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 text-white hover:bg-blue-500 py-2 px-4 rounded-lg">
                  Cadastrar atividade
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white shadow-xl rounded-lg p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-blue-800">Nova atividade</DialogTitle>
                  <DialogDescription className="text-sm text-gray-600">
                    Informe a descrição da atividade para a turma selecionada.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const turmaId = Number(id)
                    if (!turmaId) {
                      console.error('turmaId inválido')
                      return
                    }
                    setSubmitting(true)
                    axios.post('/atividade', { descricao, turmaId })
                      .then(() => {
                        setDescricao("")
                        setOpen(false)
                        loadAtividades()
                      })
                      .catch((error) => {
                        console.error('Erro ao cadastrar atividade:', error)
                      })
                      .finally(() => setSubmitting(false))
                  }}
                  className="space-y-4"
                >
                  <Input
                    type="text"
                    placeholder="Descrição da atividade"
                    value={descricao}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescricao(e.target.value)}
                    required
                  />
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={submitting || !descricao.trim()}
                      className="bg-blue-600 text-white hover:bg-blue-500 py-2 px-4 rounded-lg"
                    >
                      {submitting ? 'Enviando...' : 'Salvar'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <h2 className="text-xl font-semibold text-gray-800">
            Turma: <span className="text-blue-700">{turma}</span>
          </h2>

          <ul className="space-y-3">
            {atividades.map(atividade => (
              <li
                key={atividade.id}
                className="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <span className="text-lg text-gray-700">
                  {atividade.id} - {atividade.descricao}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}

export default Atividades
