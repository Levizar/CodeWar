#include <stddef.h>

int square_sum(const int *values, size_t count)
{
  int squaredSum = 0;
  for(int i=0; i<count; ++i)
  {
    squaredSum += *(values + i) * *(values + i);
  }
  return squaredSum;
}