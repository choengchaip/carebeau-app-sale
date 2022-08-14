import {useLoader} from "../../src/hooks/loader.hook";
import renderer from 'react-test-renderer';
import React, {useEffect, useState} from "react";

describe('Hook', () => {
  test('Loader', () => {
    const Mock = () => {
      const loader = useLoader({
        method: 'post',
        getURL: () => 'https://carebeauplus.amn-corporation.com/login/token',
      })

      return (
        <></>
      )
    }

    renderer.create(<Mock/>).toTree()
  })
});