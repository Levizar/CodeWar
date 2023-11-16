defmodule Numerify do
  require Record
  def string_to_number(str) do
    {v, _} = str |> Integer.parse
    v
  end
end
