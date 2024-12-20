#!/bin/bash
# Usage: ./rand.sh $MAX_VALUE

echo $((1 + $RANDOM % $1))
