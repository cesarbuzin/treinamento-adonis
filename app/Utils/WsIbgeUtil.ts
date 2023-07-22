import axios from 'axios'

export class WsIbgeUtil {
  public static async findCodigoIbge(nomCidade: string): Promise<number | null> {
    const nomCidadeEditada = nomCidade
      .replaceAll(' ', '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    const { data } = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${nomCidadeEditada}`
    )

    if (data !== null) {
      return data['id']
    }

    return null
  }
  public static async findNomCidade(idIbge: number): Promise<string | null> {
    const { data } = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${idIbge}`
    )

    if (data !== null) {
      return data['nome']
    }

    return null
  }
}
