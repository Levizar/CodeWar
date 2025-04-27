defmodule VowelCount do
  def get_count(str) do
    ~r/(a|e|i|o|u)/i
    |> Regex.scan(str)
    |> Enum.count()
  end
end

# defmodule VowelCount do
#   @vowels ~w[a i u e o]
#   
#   def get_count(str) do
#     str
#     |> String.graphemes
#     |> Enum.count(fn(x) -> x in @vowels end)
#   end
# end
