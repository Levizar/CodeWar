defmodule SumMix do
  def sumMin(list) do
    list
    |> Enum.map(
      fn
        x when is_integer(x) -> x
        x when is_binary(x) -> String.to_integer(x)
      end
    )
    |> Enum.sum
  end
end
