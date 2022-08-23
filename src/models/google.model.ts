export interface IGoogleResult {
  formatted_address: string
}

export interface IGoogle {
  status: string
  results: IGoogleResult[]
}